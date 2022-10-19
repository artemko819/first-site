import React from "react";
import Icon from "../components/Icon";
// import ColorStain from "../components/ui/ColorStain";
import { getDomainName } from "../utils/utils";

const TGLint = "https://t.me/HestiaExchange_support";
const TGName = "Hestia exchange support";
const gmailLink = `support@${getDomainName()}`;

const Contacts = () => (
  <>
    {/* <ColorStain size={200} color="orange" className="u-left-75" /> */}
    <div className="h-full w-full flex justify-center items-center">
      <div className="blur-bg rounded-lg">
        <div className="p-8">
          <h2 className="text-center font-bold md:text-3xl text-xl mb-5">
            Контакты
          </h2>
          <p className="mb-5">
            Если у вас возникли вопросы технического или финансового плана,
            напишите нам и мы поможем Вам в решении вашего вопроса. Мы отвечаем
            на вопросы в течении 15-60 минут в зависимости от загрузки сервиса
          </p>
          <div className="flex justify-evenly flex-col md:flex-row">
            <div>
              <p className="text-lg mb-3 font-bold">Техническая поддержка</p>
              <div className="flex items-center mb-5">
                <Icon
                  name="query_builder"
                  className="bg-accent p-2 rounded-lg"
                />
                <div className="ml-4">
                  <p className="text-sm">Время работы:</p>
                  <p className="font-bold">Круглосуточно</p>
                </div>
              </div>
              <div className="flex items-center mb-5">
                <Icon name="mail" className="bg-accent p-2 rounded-lg" />
                <div className="ml-4">
                  <p className="text-sm">Поддержка по почте:</p>
                  <a href={`mailto:${gmailLink}`} className="font-bold">
                    {gmailLink}
                  </a>
                </div>
              </div>
              <div className="flex items-center mb-5">
                <Icon name="telegram" className="bg-accent p-2 rounded-lg" />
                <div className="ml-4">
                  <p className="text-sm">Поддержка в Telegram:</p>
                  <a target="_blank" rel="noreferrer" href={TGLint} className="font-bold">
                    {TGName}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg mb-3 font-bold">Сотрудничество и PR</p>
              <div className="flex items-center mb-5">
                <Icon
                  name="query_builder"
                  className="bg-accent p-2 rounded-lg"
                />
                <div className="ml-4">
                  <p className="text-sm">Время работы:</p>
                  <p className="font-bold">Круглосуточно</p>
                </div>
              </div>
              <div className="flex items-center mb-5">
                <Icon name="mail" className="bg-accent p-2 rounded-lg" />
                <div className="ml-4">
                  <p className="text-sm">Поддержка по почте:</p>
                  <a href={`mailto:${gmailLink}`} className="font-bold">
                    {gmailLink}
                  </a>
                </div>
              </div>
              <div className="flex items-center mb-5">
                <Icon name="telegram" className="bg-accent p-2 rounded-lg" />
                <div className="ml-4">
                  <p className="text-sm">Поддержка в Telegram:</p>
                  <a target="_blank" rel="noreferrer" href={TGLint} className="font-bold">
                    {TGName}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a href={TGLint} className="mt-10 py-3 text-lg font-bold rounded-lg bg-accent transition w-full block text-center">
            Написать оператору
          </a>
        </div>
      </div>
    </div>
    {/* <ColorStain size={300} color="blue" /> */}
  </>
);

export default Contacts;
