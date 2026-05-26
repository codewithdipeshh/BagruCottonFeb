import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type AccountPlaceholderProps = {
  title: string;
  description: string;
};

export default function AccountPlaceholder({
  title,
  description,
}: AccountPlaceholderProps) {
  const { isLoggedIn, userName } = useApp();

  return (
    <div className="min-h-[50vh] max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-serif font-bold text-[#080616] mb-4">{title}</h1>
      <p className="text-stone-600 leading-relaxed mb-8">
        {isLoggedIn ? `${description} Welcome, ${userName}.` : description}
      </p>
      {!isLoggedIn && (
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="px-6 py-3 bg-[#080616] text-white text-sm font-semibold rounded-full"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 border border-stone-300 bg-white text-sm font-semibold rounded-full"
          >
            Sign Up
          </Link>
        </div>
      )}
      <Link to="/sarees" className="inline-block mt-6 text-sm text-[#9A8478] hover:underline">
        Continue shopping
      </Link>
    </div>
  );
}
