import { useEffect, useState } from "react";
import { getKangals } from "../../pages/Kangal/api";
import { useTranslation } from "react-i18next";
import { KangalView } from "./KangalView";
import { Spinner } from "./Spinner";
import { Button } from "./Button";

export function Kangalite() {
  const [kangalPage, setKangalPage] = useState({
    content: [],
    last: true,
    number: 0,
  }); // sayfa yapılandırma
  const { t } = useTranslation(); //Dil çeviri
  const { content, last, number } = kangalPage;

  useEffect(() => {
    loadKangals();
  }, []);
  const loadKangals = async (page) => {
    try {
      const response = await getKangals(page);
      setKangalPage((previousKangalPage) => ({
        ...response.data,
        content: [...previousKangalPage.content, ...response.data.content],
      }));
    } catch (error) {}
  };

  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {t("KangaliteInformation")}
      </div>
    );
  }
  return (
    <div>
      {content.map((kangal) => {
        return <KangalView key={kangal.id} kangal={kangal} />;
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          
          onClick={() => loadKangals(number + 1)}
        >
        <Button >{t("OldKangalite")}</Button>
          
        </div>
      )}
    </div>
  );
}
