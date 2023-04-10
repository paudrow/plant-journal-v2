import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl py-12">Dashboard</h1>
        <p className="text-lg">You must be signed in to view this page</p>
      </div>
    )
  }

  const plants = api.example.getPlants.useQuery()
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl py-12">Dashboard</h1>
      <div className="container w-96">
        <ol>
          {plants.data?.map((plant) => (
            <li key={plant.id}>
              <Link href={`/dashboard/plant/${plant.id}`} className="flex flex-row items-center gap-4 border-4 p-4 rounded-lg">
                {plant.PlantImage.length > 0 && plant.PlantImage[0]?.imageUrl && (
                  <Image className="w-16 h-16 rounded-full"
                    src={plant.PlantImage[0].imageUrl}
                    alt={plant.name}
                    width={64}
                    height={64}
                  />
                )}
                <div className="flex flex-col items-start">
                  <p className="text-lg">
                    {plant.name}
                  </p>
                  {plant.PlantEvent.length > 0 && plant.PlantEvent[0]?.event && (
                    <p className="text-slate-500">
                      last { plant.PlantEvent[0].event.toLowerCase() } on {plant.PlantEvent[0].createdAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}