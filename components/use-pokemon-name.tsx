"use client"

import { useEffect, useState } from "react"
import getPokemonJapaneseName from "./pokemon-name"

export function usePokemonJapaneseName(englishName: string) {
  const [japaneseName, setJapaneseName] = useState("")

  useEffect(() => {
    getPokemonJapaneseName(englishName).then((name) => {
      setJapaneseName(name)
    })
  }, [englishName])

  return japaneseName
}

export default usePokemonJapaneseName
