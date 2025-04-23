"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/LoginModal"
import { useState } from "react"
import {
  Building2,
  Calendar,
  MapPin,
  GraduationCap,
  MessageSquare,
  Database,
  Users,
  Map,
  BarChart3,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
} from "lucide-react"

export default function LandingPage() {
  const [isLoginModalHidden, setIsLoginModalHidden] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-32 items-center justify-between">
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="UrbanLink Government Logo"
              width={120}
              height={120}
              className="h-28 w-28"
              priority
            />
            <span className="text-4xl font-bold">UrbanLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#why-choose-us" className="text-sm font-medium hover:text-primary">
              Why Choose Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="hidden md:inline-flex" onClick={() => setIsLoginModalHidden(false)}>
              <Link href="#">Login</Link>
            </Button>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/register">Register</Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="City skyline"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container relative z-10 py-20 md:py-32">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Smart Collaboration for Smart Cities
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  UrbanLink streamlines interdepartmental cooperation, making urban governance more efficient,
                  transparent, and effective.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Urban planning dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Urban Collaboration</h2>
              <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
                UrbanLink provides all the tools city departments need to work together seamlessly
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Database className="h-10 w-10 text-primary" />}
                title="Data & Resource Sharing"
                description="Share critical data and resources across departments to eliminate silos and improve decision-making."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Project Scheduling"
                description="Coordinate project timelines and task distribution to optimize workflows and prevent overlaps."
              />
              <FeatureCard
                icon={<MapPin className="h-10 w-10 text-primary" />}
                title="Map Visualization"
                description="Visualize projects on unified maps to better coordinate infrastructure development and maintenance."
              />
              <FeatureCard
                icon={<GraduationCap className="h-10 w-10 text-primary" />}
                title="Capacity Building"
                description="Access workshops, seminars, and training resources to enhance departmental capabilities."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Discussion Forums"
                description="Collaborate through dedicated forums to share ideas, solve problems, and improve communication."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Team Collaboration"
                description="Build cross-departmental teams to tackle complex urban challenges with diverse expertise."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How UrbanLink Works</h2>
              <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
                Our platform connects all city departments through an intuitive interface
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="UrbanLink map interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-8 order-1 md:order-2">
                <div className="flex gap-4">
                  <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connect Departments</h3>
                    <p className="text-muted-foreground">
                      Bring all city departments onto a single platform with secure access controls.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Share Project Data</h3>
                    <p className="text-muted-foreground">
                      Upload and share project details, timelines, and resources across departments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Visualize on Maps</h3>
                    <p className="text-muted-foreground">
                      See all projects on interactive maps to identify overlaps and opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Collaborate & Execute</h3>
                    <p className="text-muted-foreground">
                      Work together through forums, task assignments, and progress tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-16 md:py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose UrbanLink</h2>
              <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
                Our platform is designed specifically for the unique challenges of urban governance
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                icon={<BarChart3 className="h-8 w-8 text-primary" />}
                value="40%"
                label="Increase in Efficiency"
              />
              <StatCard icon={<Map className="h-8 w-8 text-primary" />} value="60+" label="Cities Using UrbanLink" />
              <StatCard
                icon={<Calendar className="h-8 w-8 text-primary" />}
                value="30%"
                label="Faster Project Completion"
              />
              <StatCard icon={<Users className="h-8 w-8 text-primary" />} value="10k+" label="Municipal Employees" />
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="UrbanLink has transformed how our departments collaborate on infrastructure projects."
                author="Sarah Johnson"
                role="Urban Planning Director"
                city="Metro City"
              />
              <TestimonialCard
                quote="The map visualization feature alone has saved us countless hours of coordination meetings."
                author="Michael Chen"
                role="Public Works Manager"
                city="Riverside"
              />
              <TestimonialCard
                quote="We've reduced project delays by 35% since implementing UrbanLink across all departments."
                author="David Rodriguez"
                role="City Manager"
                city="New Harbor"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Streamline Your Urban Governance?</h2>
              <p className="text-xl opacity-90">
                Join the growing network of cities using UrbanLink to transform interdepartmental collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">UrbanLink</span>
              </div>
              <p className="text-slate-400 mb-4">Streamlining urban governance through smart collaboration.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-slate-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-slate-400">
                  123 Urban Avenue, Suite 400
                  <br />
                  Metro City, MC 10001
                </li>
                <li>
                  <Link href="mailto:info@urbanlink.com" className="text-slate-400 hover:text-white">
                    info@urbanlink.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+15551234567" className="text-slate-400 hover:text-white">
                    +1 (555) 123-4567
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} UrbanLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <LoginModal isHidden={isLoginModalHidden} setIsHidden={setIsLoginModalHidden} />
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role, city }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
      <p className="italic mb-4 text-muted-foreground">"{quote}"</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role}, {city}
        </p>
      </div>
    </div>
  )
}
