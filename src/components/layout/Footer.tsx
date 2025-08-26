export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">E-Gov Portal</h3>
            <p className="text-gray-300">
              Secure and intelligent government services for all citizens.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services/documents" className="hover:text-white">Documents</a></li>
              <li><a href="/services/tax" className="hover:text-white">Tax Services</a></li>
              <li><a href="/services/registration" className="hover:text-white">Registration</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/support" className="hover:text-white">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/accessibility" className="hover:text-white">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 E-Governance Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
