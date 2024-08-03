import {Button} from '@/components/ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="py-3 sticky top-0 z-50 bg-slate-800 shadow-md">
      <div className="flex justify-between container mx-auto w-full items-center">
        <Link href="/drugs/search">
          <h6 className="text-xl font-bold text-white tracking-tighter tracking">
            Dr💊gz
          </h6>
        </Link>
        <div className="flex gap-2"></div>
      </div>
    </header>
  )
}

export default Header
