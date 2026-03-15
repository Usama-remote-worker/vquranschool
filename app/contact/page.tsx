"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const object = Object.fromEntries(formData);
        
        // Add your Web3Forms Access Key
        object.access_key = "e0e53b13-9b10-4f66-a1fe-e2939d66cff8";
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });
            
            const result = await response.json();

            if (result.success) {
                alert("Message sent! We will get back to you soon.");
                e.currentTarget.reset();
            } else {
                console.error("Web3Forms Error:", result);
                alert("Something went wrong. Please email us directly.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center border-b border-slate-200 bg-white">
                {/* Visual Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                        alt="Mosque Interior"
                        fill
                        className="object-cover mix-blend-multiply"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
                </div>

                <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-950 mb-6 font-serif">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Have a question or need assistance? Our support team is here to help you.
                    </p>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden bg-slate-50">
                <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-blue-100 blur-[120px] rounded-full pointer-events-none mix-blend-multiply -translate-y-1/2"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6 font-serif">Get in Touch</h2>
                                <p className="text-slate-600 leading-relaxed font-light text-lg">
                                    Whether you want to learn more about our courses, need technical support for your dashboard, or have a general inquiry, feel free to reach out. We aim to respond to all inquiries within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="bg-white border border-slate-200 p-4 rounded-2xl text-blue-600 group-hover:border-blue-300 group-hover:bg-blue-50 shadow-sm transition-colors duration-500 flex shrink-0">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-blue-950 mb-2 font-serif">Email Address</h4>
                                        <p className="text-slate-600 font-medium">lisanquranacademy@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-white border border-slate-200 p-4 rounded-2xl text-blue-600 group-hover:border-blue-300 group-hover:bg-blue-50 shadow-sm transition-colors duration-500 flex shrink-0">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-blue-950 mb-2 font-serif">Phone & WhatsApp</h4>
                                        <p className="text-slate-600 font-medium">+92 304 4296295</p>
                                        <p className="text-blue-500 italic text-sm mt-1">Available 24/7 for urgent inquiries</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-white border border-slate-200 p-4 rounded-2xl text-blue-600 group-hover:border-blue-300 group-hover:bg-blue-50 shadow-sm transition-colors duration-500 flex shrink-0">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-blue-950 mb-2 font-serif">Location</h4>
                                        <p className="text-slate-600 font-medium">Ittefaq Town, Lahore,<br />Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Card className="shadow-2xl shadow-blue-900/10 border-slate-200 bg-white rounded-3xl overflow-hidden relative">
                                <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-blue-100 blur-[50px] rounded-full pointer-events-none"></div>

                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-8 pt-8 px-8">
                                    <div className="relative z-10">
                                        <CardTitle className="text-2xl font-bold text-blue-950 font-serif mb-2">Send us a Message</CardTitle>
                                        <CardDescription className="text-slate-500 font-light text-base">Fill out the form below and we'll reply to your email.</CardDescription>
                                    </div>
                                </CardHeader>
                                <form onSubmit={handleSubmit}>
                                    <CardContent className="space-y-6 mt-8 px-8 relative z-10">
                                        <div className="space-y-3">
                                            <Label htmlFor="name" className="text-slate-700 text-sm font-medium">Full Name</Label>
                                            <Input name="name" id="name" required className="bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 h-12 rounded-xl px-4" placeholder="Your name" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email Address</Label>
                                            <Input name="email" id="email" type="email" required className="bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 h-12 rounded-xl px-4" placeholder="you@domain.com" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="subject" className="text-slate-700 text-sm font-medium">Subject</Label>
                                            <Input name="subject" id="subject" required className="bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 h-12 rounded-xl px-4" placeholder="How can we help?" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="message" className="text-slate-700 text-sm font-medium">Message</Label>
                                            <Textarea name="message" id="message" required className="bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 min-h-[150px] rounded-xl p-4" placeholder="Type your message here..." />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pb-8 px-8 pt-4 relative z-10">
                                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                                            {loading ? "Sending..." : "Send Message"}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
