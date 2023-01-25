import type { Key } from "react";
import type { Card } from "../type/components";

type Props = {
  cards: Card[];
};

export default function CardSection({ cards }: Props) {
  return (
    <div className="demo-section">
      {cards?.map((card: Card, index: Key) => (
        <div className="cards" key={index}>
          {card.title_h3 && (
            <h3 {...(card.$?.title_h3 as {})}>{card.title_h3}</h3>
          )}
          {card.description && (
            <p {...(card.$?.description as {})}>{card.description}</p>
          )}
          <div className="card-cta">
            {card.call_to_action.title && card.call_to_action.href && (
              <a href={card.call_to_action.href} className="btn primary-btn">
                {card.call_to_action.title}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
