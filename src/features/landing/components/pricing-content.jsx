import { Check, Minus, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: 'Lite',
    description: 'Plano mais básico que temos',
    price: 60.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: false },
      { name: 'Version Control', value: false },
      { name: 'Members', value: 5 },
      { name: 'Multiplayer Mode', value: false },
    ]
  },
  {
    name: 'Medium',
    description: 'Plano pouco mais robusto',
    price: 110.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: true },
      { name: 'Version Control', value: true },
      { name: 'Members', value: 10 },
      { name: 'Multiplayer Mode', value: false },
    ]
  },
  {
    name: 'Professional',
    description: 'Plano mais completo',
    price: 180.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: true },
      { name: 'Version Control', value: true },
      { name: 'Members', value: 5 },
      { name: 'Multiplayer Mode', value: true },
    ]
  }
]

const featuresList = [
  'SSO',
  'AI Assistant',
  'Version Control',
  'Members',
  'Multiplayer Mode'
]

export default function PlanContent() {
  return (
    <>
      {/* versão mobile */}
      <div className="grid gap-6 lg:hidden">
        {plans.map(plan => (
          <div className="border rounded-2xl p-4">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-muted-foreground">{plan.description}</p>
            <p className="text-2xl mt-2">AOA {plan.price} / mês</p>

            <div className="mt-4 space-y-2">
              {plan.features.map(f => (
                <div className="flex items-center justify-between">
                  <span>{f.name}</span>
                  {f.value === true && <Check className="w-4 h-4 text-primary" />}
                  {f.value === false && <Minus className="w-4 h-4 text-muted-foreground" />}
                  {typeof f.value === 'number' && <span>{f.value} members</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* versão desktop */}
      <div className="hidden md:grid w-full grid-cols-3 pt-20 text-left divide-x lg:grid-cols-4 container">
        <div className="col-span-3 lg:col-span-1"></div>

        {plans.map((plan) => (
          <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
            <p className="text-2xl text-accent-foreground">{plan.name}</p>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
            <p className="flex flex-col gap-2 mt-8 text-xl lg:flex-row lg:items-center">
              <span className="text-4xl text-secondary-foreground">AOA {plan.price}</span>
              <span className="text-sm text-muted-foreground"> / mês</span>
            </p>
            <Button variant="outline" className="gap-4 mt-8">
              Assinar agora <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1 text-secondary-foreground">
          <b>Recurso</b>
        </div>

        <div></div>
        <div></div>
        <div></div>

        {featuresList.map((featureName) => (
          <>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">{featureName}</div>

            {plans.map((plan) => {
              const feature = plan.features.find((feature) => {
                return feature.name === featureName
              })

              return (
                <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                  {feature?.value === true && <Check className="w-4 h-4 text-accent-foreground" />}

                  {feature?.value === false && <Minus className="w-4 h-4 text-primary" />}

                  {typeof feature?.value === 'number' && (
                    <p className="text-sm text-muted-foreground">
                      {feature.value} members
                    </p>
                  )}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </>

  );
}