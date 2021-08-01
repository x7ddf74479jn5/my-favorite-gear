import { useState } from "react";
import type { Gear } from "services/models/gear";
import { getGearsFactory } from "services/rakutenApi";

const useRakutenSearch = () => {
  const [gears, setGears] = useState<Gear[]>([]);
  const [loading, setLoading] = useState(false);

  const searchGears = (keyword: string) => {
    if (keyword.trim() === "") {
      setGears([]);
      return;
    }
    setLoading(true);
    const getGears = getGearsFactory({ keyword: keyword });
    getGears().then((songs) => {
      setGears(songs);
      setLoading(false);
    });
  };
  return { gears, loading, searchGears };
};

export default useRakutenSearch;
