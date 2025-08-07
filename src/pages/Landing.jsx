import CardSwap, { Card } from '@/components/CardSwap'
import { Button } from '@/components/ui/button'

export default function Landing() {
  return (
    <>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <h3>Card 1</h3>
            <p>Your content here</p>
          </Card>
          <Card>
            <h3>Card 2</h3>
            <p>Your content here</p>
          </Card>
          <Card className='bg-red-500'>
            <h3>Card 3</h3>
            <p>Your content here</p>
          </Card>
        </CardSwap>

      
    </>
  )
}