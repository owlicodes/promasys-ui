"use client";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/features/common/components/submit-button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useDialogConfigStore from "@/stores/dialog-store";

import { useCreateSprint } from "../apis/use-create-sprint";
import { useUpdateSprint } from "../apis/use-update-sprint";
import { TSprint, TSprintFormSchema, sprintFormSchema } from "../sprint-schema";

export const SprintForm = ({ data }: { data?: TSprint }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const form = useForm<TSprintFormSchema>({
    resolver: zodResolver(sprintFormSchema),
    defaultValues: {
      name: data?.name || "",
      dateRange: {
        from: data?.startDate ? new Date(data.startDate) : undefined,
        to: data?.endDate ? new Date(data.endDate) : undefined,
      },
      status: data?.status ? data.status : "PLANNED",
    },
  });
  const session = useSession();
  const { setDialogConfig } = useDialogConfigStore();
  const { toast } = useToast();
  const createSprint = useCreateSprint(projectId);
  const updateSprint = useUpdateSprint(projectId);

  const showError = (message: string) =>
    toast({
      title: message,
      variant: "destructive",
    });

  const showSuccess = (message: string) => {
    setDialogConfig(undefined);

    toast({
      title: message,
    });
  };

  const onSubmit = (values: TSprintFormSchema) => {
    console.log(values);

    if (session.data?.user) {
      if (!data) {
        createSprint.mutate(
          {
            name: values.name,
            startDate: values.dateRange.from.toISOString(),
            endDate: values.dateRange.to.toISOString(),
            status: values.status,
            projectId: projectId,
          },
          {
            onSuccess: () => showSuccess("Sprint created."),
            onError: (error) => showError(error.message),
          }
        );
      } else {
        updateSprint.mutate(
          {
            id: data.id,
            name: values.name,
            startDate: values.dateRange.from.toISOString(),
            endDate: values.dateRange.to.toISOString(),
            status: values.status,
            projectId: projectId,
          },
          {
            onSuccess: () => showSuccess("Sprint updated."),
            onError: (error) => showError(error.message),
          }
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sprint status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="STARTED">Started</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isPending={createSprint.isPending || updateSprint.isPending}
        >
          {data ? "Update" : "Create"}
        </SubmitButton>
      </form>
    </Form>
  );
};
