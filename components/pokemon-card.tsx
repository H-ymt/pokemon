import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

interface PokemonCardProps {
  name: string
}

const BASE_URL = "https://pokeapi.co/api/v2/"

async function getPokemonJapaneseName(englishName: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${englishName.toLowerCase()}`
    )
    const data = response.data

    for (const nameInfo of data["names"]) {
      if (nameInfo["language"]["name"] == "ja-Hrkt") {
        return nameInfo["name"]
      }
    }
    return "日本語名が見つかりません。"
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。"
  }
}

export function PokemonCard({ name }: PokemonCardProps) {
  const [japaneseName, setJapaneseName] = useState("")

  useEffect(() => {
    getPokemonJapaneseName(name).then((name) => {
      setJapaneseName(name)
    })
  }, [name])

  return (
    <Link
      href={name}
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      key={name + "Card"}
    >
      <h2 className={`text-2xl font-semibold`}>
        {japaneseName.charAt(0).toUpperCase() + japaneseName.slice(1)}
      </h2>
    </Link>
  )
}
