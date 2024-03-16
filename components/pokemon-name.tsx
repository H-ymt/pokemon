import axios from "axios"

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

export default getPokemonJapaneseName
