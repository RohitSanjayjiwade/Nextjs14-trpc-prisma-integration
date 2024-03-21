"use client";
import { trpc } from "@/server/client";
import { useState } from "react";

export default function Home() {

  const getUsers = trpc.user.getUsers.useQuery();
  const addUsers = trpc.user.addUser.useMutation({
    onSettled: () => {
      getUsers.refetch();
    }
  });

  const [name, setName] = useState<string>("");
  const [race, setRace] = useState<string>("");

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {/*{JSON.stringify(getUsers.data)}*/}
      <div className="flex flex-col gap-3">
        Name: <input value={name} type="text" onChange={(e) => setName(e.target.value)} className="border" />
        Race: <input value={race} type="text" onChange={(e) => setRace(e.target.value)} className="border" />
        <button className="border" onClick={()=> addUsers.mutate({name, race})}>Add</button>
      </div>
    </main>
  );
}
