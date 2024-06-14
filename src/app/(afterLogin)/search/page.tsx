import style from "./search.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";
import { Metadata } from "next/types";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  return {
    title: `${searchParams.q} - 검색 X`,
    description: `${searchParams.q} - 검색 X`,
  };
};

export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} f={searchParams.f} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
