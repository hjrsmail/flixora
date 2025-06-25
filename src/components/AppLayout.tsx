import BottomNav from "./BottomNav";
import Navigation from "./Navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="mx-auto grid max-w-screen auto-rows-auto grid-cols-1 lg:grid-cols-11 md:gap-4 md:p-6 lg:gap-7">
                {/* Sidebar (desktop only) */}
                <div className=" sticky z-50 top-0 self-start h-fit col-span-1 lg:pt-4">
                    <Navigation />
                </div>

                {/* Main content */}
                <main className="col-span-full lg:col-span-10 flex-grow flex flex-col space-y-2 pb-20">
                    {children}
                </main>
            </div>

            {/* Bottom nav (mobile only) */}
            <BottomNav className="fixed bottom-0 inset-x-0 z-50 md:hidden" />
        </>
    );
}
