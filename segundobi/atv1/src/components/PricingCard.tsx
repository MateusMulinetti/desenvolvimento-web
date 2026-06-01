import Button from "./Button";
import Check from "../assets/check.svg";

interface IPricingCardProps {
    title: string;
    description: string;
    price: string;
    period?: string;
    features: string[];
    isPremium?: boolean;
    bonusText?: string;
    buttonSecondary?: boolean;
}

export default function PricingCard({
    title,
    description,
    price,
    period,
    features,
    isPremium = false,
    bonusText,
    buttonSecondary = false
}: IPricingCardProps) {
    return (
        <div className={isPremium ? "pricing-card premium" : "pricing-card"}>
            {isPremium && bonusText && (
                <span className="bonus">
                    <p>{bonusText}</p>
                </span>
            )}
            
            <span className="plan">
                <h3>{title}</h3>
                <p>{description}</p>
            </span>

            <span className="price">
                <h2>{price}</h2>
                {period && <p>{period}</p>}
            </span>

            <Button text="Pedir agora" secondary={buttonSecondary} />
            
            <span className="hr" />

            {features.map((feature, idx) => (
                <span className="features" key={idx}>
                    <img src={Check} alt="ícone check" width={24} height={24} />
                    <p>{feature}</p>
                </span>
            ))}
        </div>
    );
}