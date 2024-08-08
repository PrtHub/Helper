import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const GlobalSearch = () => {
  return (
    <section className='w-full relative max-w-[500px] max-lg:hidden'>
       <div className='relative bg-light-800 dark:dark-gradient flex items-center gap-1 grow px-4 rounded-xl min-h-12'>
        <Search className='cursor-pointer text-light-500'/>
        <Input
          type='text'
          placeholder='Search for anything...'
          className="paragraph-regular text-light-400 no-focus placeholder bg-transparent border-none shadow-none outline-none"
         />
       </div>
    </section>
  )
}

export default GlobalSearch