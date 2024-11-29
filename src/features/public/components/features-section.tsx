import { BarChart, Calendar, ClipboardList, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-8 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Key Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <ClipboardList className="mr-2 h-4 w-4" />
                Task Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Create, assign, and track tasks with ease. Stay on top of your
                project&apos;s progress.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <Users className="mr-2 h-4 w-4" />
                Team Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Work together seamlessly with real-time updates and
                communication tools.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <Calendar className="mr-2 h-4 w-4" />
                Timeline & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Visualize project timelines and set important milestones to keep
                your team on track.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Gain insights into your project&apos;s performance with detailed
                analytics and reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
