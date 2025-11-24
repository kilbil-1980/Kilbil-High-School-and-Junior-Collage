import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { CheckCircle, FileText, Phone, Mail, User, GraduationCap } from "lucide-react";

export default function Admissions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    className: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const admissionMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/admissions", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your admission application has been received. We will contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", className: "" });
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admissions"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.className) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("className", formData.className);
    
    if (file) {
      submitData.append("document", file);
    }

    admissionMutation.mutate(submitData);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Admissions</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join the Kilbil family and begin your journey towards excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Submit Application</h4>
                  <p className="text-sm text-muted-foreground">Fill out the online application form with required documents</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Review Process</h4>
                  <p className="text-sm text-muted-foreground">Our admissions team will review your application</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Interview</h4>
                  <p className="text-sm text-muted-foreground">Parents and students will be called for an interview</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-medium mb-1">Admission Confirmation</h4>
                  <p className="text-sm text-muted-foreground">Complete documentation and fee payment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-secondary" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2" data-testid="text-requirement-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Birth certificate (for new admissions)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-requirement-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Previous year's report card (for existing students)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-requirement-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Transfer certificate (if applicable)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-requirement-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Passport size photographs</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-requirement-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Address proof (Aadhar card, utility bill, etc.)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-requirement-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Parent/Guardian ID proof</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Student Name *
                    </span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter student's full name"
                    required
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter contact number"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Class Applying For *
                    </span>
                  </Label>
                  <Select value={formData.className} onValueChange={(value) => setFormData({ ...formData, className: value })}>
                    <SelectTrigger id="class" data-testid="select-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 1">Grade 1</SelectItem>
                      <SelectItem value="Grade 2">Grade 2</SelectItem>
                      <SelectItem value="Grade 3">Grade 3</SelectItem>
                      <SelectItem value="Grade 4">Grade 4</SelectItem>
                      <SelectItem value="Grade 5">Grade 5</SelectItem>
                      <SelectItem value="Grade 6">Grade 6</SelectItem>
                      <SelectItem value="Grade 7">Grade 7</SelectItem>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Upload Document (Optional)
                  </span>
                </Label>
                <Input
                  id="document"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  data-testid="input-document"
                />
                <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={admissionMutation.isPending}
                className="w-full md:w-auto"
                data-testid="button-submit"
              >
                {admissionMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
