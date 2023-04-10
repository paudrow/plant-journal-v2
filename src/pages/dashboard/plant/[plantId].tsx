import { Plant } from "@prisma/client";
import { api } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Plant() {
  const router = useRouter();
  const {plantId} = router.query
  if (!plantId || typeof plantId !== "string") return null;
  const { isLoading, data: plant, isError } = api.example.getPlant.useQuery({ plantId });
  return (
    <div>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-slate-600/20"
      onClick={() => router.back()}>Back</button>
      {isError && <p>Something went wrong</p>}
      {isLoading && <p>Loading...</p>}
      {plant && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl py-12">{plant.name}</h1>
          <div className="container w-96">
            <h2 className="text-lg">Events</h2>
            {plant.PlantEvent.map((event) => (
              <div key={event.id} className="flex flex-row items-center gap-4 border-4 p-4 rounded-lg">
                <p className="text-lg">
                  {event.event}
                </p>
                <p className="text-slate-500">
                  on {event.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
            <h2 className="text-lg">Images</h2>
            {plant.PlantImage.map((image) => (
              <div key={image.id} className="flex flex-row items-center gap-4 border-4 p-4 rounded-lg">
                <Image className="w-16 h-16 rounded-full"
                  src={image.imageUrl}
                  alt={plant.name}
                  width={64}
                  height={64}
                />
                <p className="text-slate-500">
                  on {image.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
  </div>
  );
}
