import "./InfoCard.scss";

type InfoCardProps = {
  heading: string;
  value: number;
};

export const InfoCard = ({ heading, value }: InfoCardProps): JSX.Element => {
  return (
    <div className="infoCard">
      <p className="infoCard__heading">{heading}</p>
      <p className="infoCard__value">{value}</p>
    </div>
  );
};
