import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertTestimonialSchema } from "@shared/schema";
import type { Testimonial } from "@shared/schema";
import { Trash2, Loader2, Star } from "lucide-react";

export function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    staleTime: 0,
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
  });

  const form = useForm({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      studentName: "",
      studentClass: "",
      message: "",
      rating: 5,
      photo: "",
    },
  });

  const addTestimonial = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/testimonials", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      form.reset();
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add student testimonials to display on the home page</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => addTestimonial.mutate(data))} className="space-y-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Aisha Sharma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10th B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write the testimonial here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={addTestimonial.isPending} data-testid="button-add-testimonial">
                {addTestimonial.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Add Testimonial
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>Manage student testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No testimonials yet</div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold" data-testid={`text-student-name-${testimonial.id}`}>
                          {testimonial.studentName}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Class: {testimonial.studentClass}</p>
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm">{testimonial.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTestimonial.mutate(testimonial.id)}
                        disabled={deleteTestimonial.isPending}
                        data-testid={`button-delete-testimonial-${testimonial.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
