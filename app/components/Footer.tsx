export default function Footer() {
    return (
      <footer className="bg-white border-t border-gray-300 text-gray-400 text-center py-6 mt-12">
        <p>
          © {new Date().getFullYear()} Ecommerce Store. All rights reserved.
        </p>
      </footer>
    );
  }