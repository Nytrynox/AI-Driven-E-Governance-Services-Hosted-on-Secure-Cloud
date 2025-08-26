import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer">
      <a href={href} className="block">
        <div className="bg-gov-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Icon className="text-gov-blue-600" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </a>
    </div>
  )
}
