import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined font-bold">shopping_basket</span>
            <h1 className="text-xl font-bold tracking-tight">Bujamart</h1>
          </Link>
          <button className="relative p-2 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </button>
        </header>
        <main className="flex-1 p-4 space-y-6 pb-32">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Étape 2: Paiement</p>
              <p className="text-xs text-slate-500">66% complété</p>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '66%' }}></div>
            </div>
            <p className="text-xs text-slate-500 italic">Presque fini ! Vos articles sont réservés.</p>
          </div>
          {/* Order Summary Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              Résumé du panier
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {/* Item 1 */}
              <div className="p-3 flex items-center gap-3">
                <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQfrQxeLhmqTMfTBx0Kgiv9AxdnygI-utJXVmsyMIHMj2VaplGBBZHkk0WdINUbDOVV4NBESFZWhBFvxP4F5RI40dOUKIW5DCH6veaKHukPSIVix7vlH40Wch6QJNhk_yw7CEcPcO9cVY9NO8aVGs42o9wnGTKD9tW5iCzrEf4DbZkRK4Ux0TaCL0-Gl9MkmGRCZBO4Skeiy-wGMeWNacyyN4RF8SG39nsynBs45huY_Krio0eVzx3Ht40uOzgVqvwttrlmpstGByv')" }}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">Sac de riz 25kg</h3>
                  <p className="text-xs text-slate-500">Quantité: 1</p>
                </div>
                <p className="text-sm font-bold">75.000 BIF</p>
              </div>
              {/* Item 2 */}
              <div className="p-3 flex items-center gap-3">
                <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAViaius6d4a0hJh-XuzaF5Yl9Jv6ib4ocl2GB1lz3fB3HqObeCAsxQkE-8Rf-gOoSCC5J0x9J6FnaUlB4jVvk9DK2mNt6_SQ4QL-8W6dbOKUd874mUJYI0_OV8uky_11YS0dK7dwC_9HQQDFrPmfG_EuUk6c5c1QALhEg6jlcRnBPGFZV0kLZjLCIyD9kehfimItaTrNycXr9ilF2zFXGxOM9THIzDNt3Gd7M-yzpkFlDG4vfeHUhhxasoW67JZiAEeSvEJ21rnGMe')" }}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">Huile de palme 5L</h3>
                  <p className="text-xs text-slate-500">Quantité: 2</p>
                </div>
                <p className="text-sm font-bold">30.000 BIF</p>
              </div>
              {/* Totals */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Sous-total</span>
                  <span>105.000 BIF</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Livraison</span>
                  <span className="text-green-600 font-medium">Gratuit</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-primary">105.000 BIF</span>
                </div>
              </div>
            </div>
          </section>
          {/* Shipping Address Form */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Adresse de livraison
            </h2>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Quartier & Avenue</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none px-3 py-2" placeholder="Ex: Rohero II, Avenue de l'indépendance" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Maison / Apt</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none px-3 py-2" placeholder="N° 12" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ville</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none px-3 py-2">
                    <option>Bujumbura</option>
                    <option>Gitega</option>
                    <option>Ngozi</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          {/* Payment Method Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Paiement Mobile Money
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Lumicash Option */}
              <label className="relative flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary">
                <input defaultChecked className="sr-only peer" name="payment" type="radio" />
                <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="size-12 rounded-lg bg-red-600 flex items-center justify-center mb-2 font-bold text-white text-xs text-center p-1">
                  LUMICASH
                </div>
                <span className="text-xs font-bold">Lumicash</span>
              </label>
              {/* Ecocash Option */}
              <label className="relative flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary">
                <input className="sr-only peer" name="payment" type="radio" />
                <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="size-12 rounded-lg bg-blue-600 flex items-center justify-center mb-2 font-bold text-white text-xs text-center p-1">
                  ECOCASH
                </div>
                <span className="text-xs font-bold">Ecocash</span>
              </label>
            </div>
            <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg flex items-start gap-3 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-xl">info</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Après avoir cliqué sur "Confirmer", une notification apparaîtra sur votre téléphone pour valider la transaction.
              </p>
            </div>
          </section>
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-4 py-4 text-slate-400">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Paiement Sécurisé</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Certifié</span>
            </div>
          </div>
        </main>
        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-slate-500 text-sm">Total à payer</span>
            <span className="text-xl font-extrabold text-primary">105.000 BIF</span>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span>Confirmer la commande</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
