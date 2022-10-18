import { Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";

const TechnicalProblem = () => {
  const { t } = useTranslation();
  return (
    <Modal show={true} size="4xl">
      <Modal.Body>
        <div className="p-6 text-center text-4xl font-bold text-secondaryText">
          <p>{t('errors.weHaveTechnicalProblems')}!</p>
          <p>{t('errors.pleaseTryLater')}.</p>
        </div>
      </Modal.Body>
    </Modal>
  )
};

export default TechnicalProblem;
