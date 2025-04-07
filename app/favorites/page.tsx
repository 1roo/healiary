import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import HomeBox from "@/components/home-box";

export default async function FavoritePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const favorites = await prisma.favoriteQuote.findMany({
    where: { user: { email: session.user.email! } },
    include: {
      quote: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="sticky top-0 z-20 bg-gray-50 text-gray-500 font-bold text-center py-3 shadow-sm">
        내가 저장한 명언
      </div>
      {favorites.length === 0 ? (
        <p>저장한 명언이 없습니다.</p>
      ) : (
        <div>
          {favorites.map((fav) => (
            <HomeBox key={fav.id} className="p-4 border rounded shadow">
              “{fav.quote.content}”
            </HomeBox>
          ))}
        </div>
      )}
    </div>
  );
}
