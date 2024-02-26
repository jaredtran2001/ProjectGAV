import pokemonImg from "../assets/images/pikachu.svg";
import leagueImg from "../assets/images/league.svg";
import luffyImg from "../assets/images/luffy.svg";
import kDanceImg from "../assets/images/kdance.svg";
import kpopImg from "../assets/images/bts.svg";
import myHeroImg from "../assets/images/midoriya.svg";
import narutoImg from "../assets/images/naruto.svg";
import animeImg from "../assets/images/anya.svg";

const imageMapping = {
    ANIME: animeImg,
    NARUTO: narutoImg,
    "ONE PIECE": luffyImg,
    "KPOP GROUPS": kDanceImg,
    POKEMON: pokemonImg,
    LOL: leagueImg,
    VALORANT: leagueImg,
    "MY HERO": myHeroImg,
    DEFAULT: kpopImg,
};

export function getImage(key) {
    return imageMapping.hasOwnProperty(key) ? imageMapping[key] : imageMapping["DEFAULT"];
}
