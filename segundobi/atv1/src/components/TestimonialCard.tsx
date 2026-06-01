import Star from "../assets/star.svg";
import StarOuter from "../assets/starOuter.svg";

interface ITestimonialCardProps {
    image: string;
    text: string;
    rating: number;
    name: string;
    role: string;
}

export default function TestimonialCard({ image, text, rating, name, role }: ITestimonialCardProps) {
    const stars = Array.from({ length: 5 }, (_, index) => index < rating);

    return (
        <div className="carousel-card">
            <img src={image} alt={`Imagem perfil de ${name}`} />
            <span className="testimony">
                <p>"{text}"</p>
            </span>
            <span className="rating">
                {stars.map((isFilled, idx) => (
                    <img 
                        key={idx}
                        src={isFilled ? Star : StarOuter} 
                        alt={isFilled ? "ícone estrela" : "ícone estrela sem fundo"} 
                        width={22} 
                        height={20} 
                    />
                ))}
            </span>
            <span className="names">
                <p>{name}</p>
                <p>{role}</p>
            </span>
        </div>
    );
}