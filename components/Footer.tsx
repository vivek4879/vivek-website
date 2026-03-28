"use client";

  import { useState } from "react";
  import { useTheme } from "@/lib/theme-provider";

  type FormData = {
    name: string;
    email: string;
    message: string;
    website: string; // honeypot
  };

  type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
  };

  type Status = "idle" | "submitting" | "success" | "error";

  function validate(data: FormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    return errors;
  }

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/vivek4879" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahervivek/" },
    { label: "Email", href: "mailto:vivekaher48@gmail.com" },
  ];

  export default function Footer() {
    const { mode } = useTheme();
    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      message: "",
      website: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<Status>("idle");

    function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      // Clear error for this field as user types
      if (errors[e.target.name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
      }
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      // Honeypot check — bot filled the hidden field
      if (formData.website) {
        setStatus("success"); // Fake success to fool the bot
        return;
      }

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("submitting");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (res.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "", website: "" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    if (mode === "machine") {
      return (
        <footer id="contact" className="px-6 py-8">
          <div
            className="mx-auto max-w-[700px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <p className="text-muted">---</p>
            <p className="mt-4 text-lg font-bold text-heading">## Contact</p>
            <p className="mt-4 text-body">
              Get in touch: vivekaher48@gmail.com
            </p>
            <div className="mt-2 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-cyan underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-8 text-muted">
              © {new Date().getFullYear()} Vivek Aher
            </p>
          </div>
        </footer>
      );
    }

    return (
      <footer id="contact" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <p
            className="mb-4 text-xs uppercase tracking-wider text-cyan"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Contact
          </p>
          <h2
            className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let&apos;s connect
          </h2>

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left — info + links */}
            <div className="flex-1">
              <p className="max-w-md text-body">
                I&apos;m always open to new opportunities, collaborations, or just
                a good conversation about tech. Drop me a message and I&apos;ll
                get back to you.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-body transition-colors
  hover:text-cyan"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span className="text-cyan transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — contact form in terminal card */}
            <div className="flex-1 lg:max-w-md">
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181B]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span
                    className="ml-3 text-xs text-zinc-500"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    contact-form
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    error={errors.name}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={handleChange}
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs text-zinc-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3
   py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors
  focus:border-cyan-500"
                      style={{ fontFamily: "var(--font-mono)" }}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium
  text-zinc-950 transition-all hover:bg-cyan-400 disabled:opacity-50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>

                  {status === "success" && (
                    <p className="text-xs text-green-400">
                      Message sent! I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-xs text-red-400">
                      Something went wrong. Try emailing me directly.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t
  border-border pt-8 sm:flex-row">
            <p
              className="text-xs text-zinc-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              © {new Date().getFullYear()} Vivek Aher
            </p>
            <p
              className="text-xs text-zinc-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Built with Next.js, Tailwind CSS & Claude
            </p>
          </div>
        </div>
      </footer>
    );                                                                                                
  }
                                                                                                      
  function FormField({                                      
    label,
    name,
    type,
    value,
    error,
    onChange,
  }: {
    label: string;
    name: string;
    type: string;
    value: string;
    error?: string;                                                                                   
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) {                                                                                                
    return (                                                
      <div>
        <label
          htmlFor={name}
          className="mb-1.5 block text-xs text-zinc-400"
          style={{ fontFamily: "var(--font-mono)" }}                                                  
        >
          {label}                                                                                     
        </label>                                            
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}                                                                         
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm 
  text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-cyan-500"            
          style={{ fontFamily: "var(--font-mono)" }}        
        />                                                                                            
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );                                                                                                
  }
