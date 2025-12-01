import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function Contact() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.contact.title,
      description: pageMetadata.contact.description,
      url: window.location.href
    });
  }, []);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-soft-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-pale-beige rounded-full border border-golden-yellow/30">
            <span className="text-royal-blue font-semibold text-sm">Contact Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-royal-blue" data-testid="text-page-title">Get in Touch</h1>
          <p className="text-lg text-slate-gray">
            Reach out for admissions, queries, or information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Card className="border-l-4" style={{borderLeftColor: '#1E3A8A'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-royal-blue">
                  <MapPin className="w-5 h-5" style={{color: '#1E3A8A'}} />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid="text-address">
                  Survey No - 77, Near Shrushti Hotel<br />
                  Shrusti Chowk, Pimple Gurav<br />
                  Pune - 411061, Maharashtra, India
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{borderLeftColor: '#DC4A38'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-terracotta">
                  <Phone className="w-5 h-5" style={{color: '#DC4A38'}} />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:08128352815"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-phone"
                >
                  08128352815
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{borderLeftColor: '#0EA5E9'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{color: '#0EA5E9'}}>
                  <Mail className="w-5 h-5" style={{color: '#0EA5E9'}} />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@kilbilschool.edu"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                >
                  info@kilbilschool.edu
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{borderLeftColor: '#FCD34D'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-royal-blue">
                  <Clock className="w-5 h-5" style={{color: '#FCD34D'}} />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground space-y-1">
                  <p data-testid="text-hours-weekdays">Monday - Saturday: 7:30 AM - 4:30 PM</p>
                  <p data-testid="text-hours-sunday">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-royal-blue">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    data-testid="input-contact-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    data-testid="input-contact-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-royal-blue text-white hover:bg-terracotta" data-testid="button-send">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.1234567890!2d73.7654321!3d18.6234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzI0LjQiTiA3M8KwNDUnNTUuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '0.375rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
              data-testid="iframe-contact-map"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
