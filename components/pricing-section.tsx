import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with automation",
      features: [
        "5 automation workflows per month",
        "Basic step-by-step instructions",
        "JSON export functionality",
        "Access to 100+ integrations",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For professionals who need unlimited automation power",
      features: [
        "Unlimited automation workflows",
        "Advanced step-by-step instructions",
        "JSON export functionality",
        "Access to 1000+ integrations",
        "Priority support",
        "Team sharing capabilities",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
  ]

  return (
    <section id="pricing" className="py-20 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-[#E0E0E0]">Simple, Transparent Pricing</h2>
        <p className="text-[#BBBBBB] max-w-2xl mx-auto">Choose the plan that works best for your automation needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`bg-[#1A1A1A] border-[#333] shadow-lg shadow-black/20 ${
              plan.popular ? "border-indigo-500 shadow-lg shadow-indigo-900/20" : ""
            }`}
          >
            {plan.popular && (
              <div className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
                POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl text-[#E0E0E0]">{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-[#E0E0E0]">{plan.price}</span>
                {plan.period && <span className="text-[#999999] ml-1">{plan.period}</span>}
              </div>
              <CardDescription className="mt-2 text-[#BBBBBB]">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] hover:from-[#6A50E0] hover:to-[#9369E4] text-white"
                    : "bg-[#252525] border border-[#333] text-[#E0E0E0] hover:bg-[#333]"
                }`}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
