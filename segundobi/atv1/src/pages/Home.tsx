import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../assets/logo.svg"; 
import Menu from "../assets/hamburguer.svg"; 
import Close from "../assets/close.svg";
import Button from "../components/Button";

import CarMaintenance from "../assets/images/car-maintenance.jpg";
import OficinaBackground from "../assets/images/oficina-background.jpg";

import MecanicaIcon from "../assets/images/mecanica-icon.svg";
import SuspensaoIcon from "../assets/images/suspensao-icon.svg";
import FreiosIcon from "../assets/images/freios-icon.svg";
import OleoIcon from "../assets/images/oleo-icon.svg";
import EmbreagemIcon from "../assets/images/embreagem-icon.svg";
import CabecotesIcon from "../assets/images/cabecotes-icon.svg";
import ScannerIcon from "../assets/images/scanner-icon.svg";
import RevisoesIcon from "../assets/images/revisoes-icon.svg";
import InjecaoIcon from "../assets/images/injecao-icon.svg";

import Cliente1 from "../assets/images/iconperfil.png"; 
import Cliente2 from "../assets/images/iconperfil.png"; 
import Cliente3 from "../assets/images/iconperfil.png"; 
import TestimonialCard from "../components/TestimonialCard";

import PricingCard from "../components/PricingCard";

import InstagramIcon from "../assets/images/instagram-icon.svg";
import FacebookIcon from "../assets/images/facebook-icon.svg";
import WhatsappFootIcon from "../assets/images/whatsapp-foot-icon.svg";

import "../styles/utility.css";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import "../styles/contact.css"; 
import "../styles/footer.css";  

export default function Home() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const whatsappLink = "https://wa.me/5545999348661?text=Olá,%20gostaria%20de%20agendar%20uma%20revisão%20na%20Starmec!";

    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }
    }, [showMobileMenu]);

    const handleMenuClick = () => {
        setShowMobileMenu(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaToken) {
            toast.warn("Por favor, marque a caixa do reCAPTCHA.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, message, captchaToken: recaptchaToken }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Mensagem enviada! O e-mail já está a caminho.");
                setEmail("");
                setMessage("");
                setRecaptchaToken(null);
                recaptchaRef.current?.reset();
            } else {
                toast.error(`Erro: ${data.error || "Falha ao enviar."}`);
                setRecaptchaToken(null);
                recaptchaRef.current?.reset();
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Não foi possível conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    <img src={Logo} alt="Logo Starmec" width={220} height={80} />
                    
                    <div className="desktop-only">
                        <ul className="flex gap-1">
                            <li><a href="#">Início</a></li>
                            <li><a href="#solution">Serviços</a></li>
                            <li><a href="#testimonials">Depoimentos</a></li>
                            <li><a href="#pricing">Planos</a></li>
                        </ul>
                    </div>

                    <div className="desktop-only">
                        <div className="flex items-center">
                            <a className="reverse-color ml-lg" href={whatsappLink} target="_blank" rel="noreferrer">Contato: (45) 999348661</a>
                            <a href={whatsappLink} target="_blank" rel="noreferrer">
                                <Button text="Chamar no Zap" />
                            </a>
                        </div>
                    </div>

                    <div className="mobile-menu">
                        {showMobileMenu ? (
                            <div className="mobile-menu-content">
                                <div className="container flex">
                                    <ul>
                                        <li><a className="reverse-color" href={whatsappLink} target="_blank" rel="noreferrer" onClick={handleMenuClick}>WhatsApp Oficina</a></li>
                                        <li><a href="#" onClick={handleMenuClick}>Início</a></li>
                                        <li><a href="#solution" onClick={handleMenuClick}>Serviços</a></li>
                                        <li><a href="#testimonials" onClick={handleMenuClick}>Depoimentos</a></li>
                                        <li><a href="#pricing" onClick={handleMenuClick}>Planos</a></li>
                                    </ul>
                                    <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                        <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                <img src={Menu} alt="ícone menu" width={24} height={24} />
                            </span>
                        )}
                    </div>
                </nav>
            </header>

            <section id="hero">
                <span className="desktop-only">
                    <img src={OficinaBackground} alt="Estrutura interna da oficina Starmec" />
                </span>
                <img src={CarMaintenance} alt="Carro em manutenção na oficina mecânica" />

                <div className="container content">
                    <p className="desktop-only">Mecânica Especializada de Confiança</p>
                    <h1>Cuidado de alta performance para o seu carro, com total transparência!</h1>
                    <p className="hero-description">
                        Seu veículo merece o melhor diagnóstico técnico. Na Starmec, trabalhamos com 
                        equipamentos computadorizados para garantir sua total segurança nas pistas e estradas.
                    </p>
                    <div className="flex gap-1">
                        <span>
                            <a href={whatsappLink} target="_blank" rel="noreferrer">
                                <Button text="Agendar no WhatsApp" />
                            </a>
                        </span>
                        <span className="desktop-only">
                            <a href="#solution">
                                <Button text="Ver Nossos Serviços" secondary />
                            </a>
                        </span>
                    </div>
                </div>
            </section>

            <section className="container" id="solution">
                <header>
                    <span>
                        <h2>Nossos Serviços</h2>
                        <span className="desktop-only">
                            <h2>Soluções Automotivas Completas</h2>
                        </span>
                    </span>
                    <p>
                        Precisão em cada detalhe! A <strong>Starmec </strong>
                        oferece serviços especializados para manter a manutenção do seu veículo sempre em dia.
                    </p>
                </header>

                <section className="services-grid">
                    <div className="card">
                        <span><img src={MecanicaIcon} alt="Mecânica Geral" width={48} height={48} /></span>
                        <div>
                            <h3>Mecânica em Geral</h3>
                            <p>Manutenção preventiva e corretiva de motores nacionais e importados.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={SuspensaoIcon} alt="Suspensão" width={48} height={48} /></span>
                        <div>
                            <h3>Suspensão Completa</h3>
                            <p>Análise de amortecedores, molas, buchas e pivôs para um rodar macio.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={FreiosIcon} alt="Freios" width={48} height={48} /></span>
                        <div>
                            <h3>Sistema de Freios</h3>
                            <p>Troca de pastilhas, discos, fluido e regulagem completa do sistema ABS.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={OleoIcon} alt="Óleos" width={48} height={48} /></span>
                        <div>
                            <h3>Troca de Óleos e Filtros</h3>
                            <p>Lubrificantes de alta qualidade recomendados para o modelo do seu motor.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={EmbreagemIcon} alt="Embreagem" width={48} height={48} /></span>
                        <div>
                            <h3>Embreagem</h3>
                            <p>Substituição de kit de embreagem e reparos no sistema de transmissão.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={CabecotesIcon} alt="Cabeçotes" width={48} height={48} /></span>
                        <div>
                            <h3>Cabeçotes</h3>
                            <p>Retífica, troca de junta e manutenção especializada da parte superior.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={ScannerIcon} alt="Diagnóstico" width={48} height={48} /></span>
                        <div>
                            <h3>Diagnóstico / Scanner</h3>
                            <p>Mapeamento elétrico e injeção eletrônica com tecnologia de ponta.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={RevisoesIcon} alt="Revisões" width={48} height={48} /></span>
                        <div>
                            <h3>Revisões Periódicas</h3>
                            <p>Check-up completo de segurança por quilometragem ou antes de viajar.</p>
                        </div>
                    </div>

                    <div className="card">
                        <span><img src={InjecaoIcon} alt="Injeção Eletrônica" width={48} height={48} /></span>
                        <div>
                            <h3>Injeção Eletrônica</h3>
                            <p>Limpeza de bicos, análise de sensores e calibração para economia de combustível.</p>
                        </div>
                    </div>
                </section>
            </section>

            <section id="testimonials">
                <header>
                    <span>
                        <p className="desktop-only">Opinião de quem confia</p>
                        <h2>Quem passa aqui, aprova!</h2>
                    </span>
                    <p>
                        Compromisso total com a transparência. Veja o depoimento dos nossos clientes que 
                        não trocam o cuidado técnico da Starmec por nenhuma outra oficina.
                    </p>
                </header>

                <section className="carousel">
                    <div className="carousel-content">
                        <TestimonialCard 
                            image={Cliente1}
                            text="Levei meu carro para uma revisão completa antes de viajar e o atendimento foi impecável. Honestidade no orçamento e entrega exatamente no prazo combinado. Recomendo muito a Starmec!"
                            rating={5}
                            name="Marcos Silva"
                            role="Proprietário de Sedan"
                        />
                        <TestimonialCard 
                            image={Cliente2}
                            text="Melhor oficina da região! Resolveram um problema crônico na suspensão do meu carro que nenhuma outra mecânica conseguia achar o defeito. Atendimento nota 10."
                            rating={5}
                            name="Juca Ribeiro"
                            role="Proprietário de SUV"
                        />
                        <TestimonialCard 
                            image={Cliente3}
                            text="O diagnóstico via scanner deles é certeiro e muito rápido. Explicaram detalhadamente cada item do orçamento, sem empurrar serviços desnecessários. Ganharam um cliente!"
                            rating={5}
                            name="Pedro Santos"
                            role="Proprietário de Hatch"
                        />

                        <TestimonialCard 
                            image={Cliente1}
                            text="Levei meu carro para uma revisão completa antes de viajar e o atendimento foi impecável. Honestidade no orçamento e entrega exatamente no prazo combinado. Recomendo muito a Starmec!"
                            rating={5}
                            name="Marcos Silva"
                            role="Proprietário de Sedan"
                        />
                        <TestimonialCard 
                            image={Cliente2}
                            text="Melhor oficina da região! Resolveram um problema crônico na suspensão do meu carro que nenhuma outra mecânica conseguia achar o defeito. Atendimento nota 10."
                            rating={5}
                            name="Juca Ribeiro"
                            role="Proprietário de SUV"
                        />
                        <TestimonialCard 
                            image={Cliente3}
                            text="O diagnóstico via scanner deles é certeiro e muito rápido. Explicaram detalhadamente cada item do orçamento, sem empurrar serviços desnecessários. Ganharam um cliente!"
                            rating={5}
                            name="Pedro Santos"
                            role="Proprietário de Hatch"
                        />
                    </div>
                </section>
            </section>

            <section id="pricing" className="container">
                <header>
                    <p className="desktop-only">Prevenção e Manutenção</p>
                    <h2>Planos de Revisão</h2>
                </header>

                <section className="even-columns gap-1.5">
                    <PricingCard 
                        title="Check-up Inicial"
                        description="Ideal para quem vai rodar na cidade e precisa avaliar itens básicos de rodagem e segurança."
                        price="Grátis"
                        buttonSecondary
                        features={["Alinhamento e Balanceamento", "Análise preventiva de fluidos", "Verificação das pastilhas de freio"]}
                    />

                    <PricingCard 
                        title="Revisão Completa"
                        description="O plano definitivo para quem vai pegar a estrada ou quer manter o motor rodando como novo."
                        price="R$ 399,90"
                        period="/revisão"
                        isPremium
                        bonusText="10% DE DESCONTO À VISTA"
                        features={["Troca de óleo e filtros", "Alinhamento 3D + Balanceamento", "Check-up elétrico completo", "Higienização completa do Ar-condicionado"]}
                    />
                </section>
            </section>

            <section id="contact">
                <div className="container">
                    <header>
                        <p>Envie sua dúvida</p>
                        <h2>Entre em contato</h2>
                        <span>
                            Entre em contato, estamos dispostos a tirar qualquer dúvida, seja um orçamento 
                            ou uma dúvida técnica do seu veículo. Estamos à disposição para responder. 🔧
                        </span>
                    </header>

                    <form onSubmit={handleFormSubmit}>
                        <input 
                            type="email" 
                            placeholder="Seu Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required 
                        />
                        <textarea 
                            placeholder="Motivo do contato. Ex: Gostaria de agendar uma troca de óleo na próxima terça-feira, teria horário disponível?" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={loading}
                            required
                        ></textarea>

                     <div className="captcha-container">
                     <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={(token) => setRecaptchaToken(token)}
                            theme="dark"
                        />
                         </div>
                        
                        <button 
                            type="submit" 
                            className="btn-primary" 
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar Mensagem"}
                        </button>
                    </form>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <img src={Logo} alt="Logo Starmec" />
                            <div className="footer-socials">
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                    <img src={InstagramIcon} alt="Instagram" width={24} height={24} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                    <img src={FacebookIcon} alt="Facebook" width={24} height={24} />
                                </a>
                                <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                                    <img src={WhatsappFootIcon} alt="WhatsApp" width={24} height={24} />
                                </a>
                            </div>
                        </div>

                        <div className="footer-links-column">
                            <h4>Empresa</h4>
                            <ul>
                                <li><a href="#">Sobre nós</a></li>
                                <li><a href="#">Faça parte do time</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4>Funcionalidades</h4>
                            <ul>
                                <li><a href="#solution">Agendamento</a></li>
                                <li><a href="#solution">Diagnóstico Avançado</a></li>
                                <li><a href="#">Suporte 24h</a></li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4>Recursos</h4>
                            <ul>
                                <li><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp Oficial</a></li>
                                <li><a href="#pricing">Tabela de Preços</a></li>
                                <li><a href="#testimonials">Avaliações</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <p>Feito por Mateus © 2026 Starmec - Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>

            {}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" 
            />
        </>
    );
}