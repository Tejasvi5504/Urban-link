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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function LandingPage() {
  const [isLoginModalHidden, setIsLoginModalHidden] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F5F9FC] to-[#E8F2F9]">
      <header className="border-b border-[#E5E7EB] bg-[#F5F9FC]">
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
            <span className="text-4xl font-bold text-[#1A1A1A]">UrbanLink</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-[#4B5563] hover:text-[#004B8D]">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-[#4B5563] hover:text-[#004B8D]">
              How It Works
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" className="border-[#004B8D] text-[#004B8D] hover:bg-[#004B8D] hover:text-white" onClick={() => setIsLoginModalHidden(false)}>
              <Link href="#">Login</Link>
            </Button>
            <Button asChild className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-[#004B8D]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-[#F5F9FC] border-t border-[#E5E7EB]`}>
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <Link 
                href="#features" 
                className="text-sm font-medium text-[#4B5563] hover:text-[#004B8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium text-[#4B5563] hover:text-[#004B8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>
            <div className="flex flex-col gap-4 pt-4 border-t border-[#E5E7EB]">
              <Button 
                asChild 
                variant="outline" 
                className="w-full border-[#004B8D] text-[#004B8D] hover:bg-[#004B8D] hover:text-white"
                onClick={() => {
                  setIsLoginModalHidden(false);
                  setMobileMenuOpen(false);
                }}
              >
                <Link href="#">Login</Link>
              </Button>
              <Button 
                asChild 
                className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[#F5F9FC]/50 backdrop-blur-sm -z-10"></div>
        {/* Hero Section */}
        <section className="relative">
          <div className="container relative z-10 py-20 md:py-32">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A]">
                  Smart Collaboration for Smart Cities
                </h1>
                <p className="text-xl text-[#4B5563] max-w-[600px]">
                  UrbanLink streamlines interdepartmental cooperation, making urban governance more efficient,
                  transparent, and effective.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => setIsLoginModalHidden(false), 500);
                    }}
                  >
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-[#004B8D] text-[#004B8D] hover:bg-[#004B8D] hover:text-white">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                  }}
                  className="h-full"
                >
                  <SwiperSlide>
                    <div className="relative h-full bg-white">
                      <Image
                        src="/images/Carosel1.jpg"
                        alt="Data Analytics Dashboard"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative h-full">
                      <Image
                        src="/images/Carosel.jpg"
                        alt="Smart City Dashboard"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative h-full">
                      <Image
                        src="/images/Carosel3.jpg"
                        alt="Data Analytics Dashboard"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button-next !text-white after:!text-2xl"></div>
                  <div className="swiper-button-prev !text-white after:!text-2xl"></div>
                  <div className="swiper-pagination !bottom-2"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Powerful Features for Urban Collaboration</h2>
              <p className="text-lg text-[#4B5563] max-w-[800px] mx-auto">
                UrbanLink provides all the tools city departments need to work together seamlessly
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Database className="h-10 w-10 text-[#FFA500]" />}
                title="Data & Resource Sharing"
                description="Share critical data and resources across departments to eliminate silos and improve decision-making."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-[#FFA500]" />}
                title="Project Scheduling"
                description="Coordinate project timelines and task distribution to optimize workflows and prevent overlaps."
              />
              <FeatureCard
                icon={<MapPin className="h-10 w-10 text-[#FFA500]" />}
                title="Map Visualization"
                description="Visualize projects on unified maps to better coordinate infrastructure development and maintenance."
              />
              <FeatureCard
                icon={<GraduationCap className="h-10 w-10 text-[#FFA500]" />}
                title="Capacity Building"
                description="Access workshops, seminars, and training resources to enhance departmental capabilities."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-[#FFA500]" />}
                title="Discussion Forums"
                description="Collaborate through dedicated forums to share ideas, solve problems, and improve communication."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-[#FFA500]" />}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">How UrbanLink Works</h2>
              <p className="text-lg text-[#4B5563] max-w-[800px] mx-auto">
                Our platform connects all city departments through an intuitive interface
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1 bg-[#FFF5EB]">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/govt.jpg"
                    alt="Government Official"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'contain',
                      padding: '1rem'
                    }}
                    priority
                  />
                </div>
              </div>
              <div className="space-y-8 order-1 md:order-2">
                <div className="flex gap-4">
                  <div className="bg-[#004B8D]/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#004B8D]">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Connect Departments</h3>
                    <p className="text-[#4B5563]">
                      Bring all city departments onto a single platform with secure access controls.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#004B8D]/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#004B8D]">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Share Project Data</h3>
                    <p className="text-[#4B5563]">
                      Upload and share project details, timelines, and resources across departments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#004B8D]/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#004B8D]">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Visualize on Maps</h3>
                    <p className="text-[#4B5563]">
                      See all projects on interactive maps to identify overlaps and opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#004B8D]/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#004B8D]">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Collaborate & Execute</h3>
                    <p className="text-[#4B5563]">
                      Work together through forums, task assignments, and progress tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#004B8D] text-white">
          <div className="container">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Streamline Your Urban Governance?</h2>
              <p className="text-xl opacity-90">
                Join the growing network of cities using UrbanLink to transform interdepartmental collaboration.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => setIsLoginModalHidden(false), 500);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#004B8D] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">UrbanLink</span>
              </div>
              <p className="text-white/80 mb-4">Streamlining urban governance through smart collaboration.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-white/80 hover:text-white">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-white/80">
                  123 Urban Avenue, Suite 400
                  <br />
                  Metro City, MC 10001
                </li>
                <li>
                  <Link href="mailto:info@urbanlink.com" className="text-white/80 hover:text-white">
                    info@urbanlink.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+15551234567" className="text-white/80 hover:text-white">
                    +1 (555) 123-4567
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white mt-12 pt-8 text-center text-white/80">
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#E5E7EB]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">{title}</h3>
      <p className="text-[#4B5563]">{description}</p>
    </div>
  )
}
