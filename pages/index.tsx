import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'


export default function Home() {
  return (
    <main>
      <Header/>
      <section clas>
        <div >
            <h1>We Have Everything <br>Your <span>Car</span> Needs</h1>
            <p><br>Welcome to our car website, your ultimate destination for all things automotive.<br>
                Whether you're a car enthusiast or simply looking for your next vehicle,<br>
                we provide a wealth of information and resources to help you make informed decisions.<br>
                From comprehensive reviews and comparisons to the latest news and trends,<br>
                we've got you covered. Join us on a journeythrough the exciting world of cars.</p><br><br>
            <!-- Home Button -->
            <Link href="#" className="btn">Explore Now</Link>
        </div>
        <div>
          <Image src="/assets/Benz.png"/>
        </div>

      </section>
    </main>
     )
}
