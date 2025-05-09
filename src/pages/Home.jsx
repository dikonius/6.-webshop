import BestGames from "../components/BestSellingGames"
import "../styles/home.css"

const Home = () => {


	return (
		<main>
            <img src="/src/assets/logo.png" alt="Switch Again Logo" className="hero-logo" />

			<p className="welcome-description">Welcome to Switch Again! Your<span className="key-word"> Online Second-Hand </span>Nintendo Switch Store!</p>

			<p className="welcome-description"><span className="key-word"> Save big </span>by buying pre-owned and enjoy the same amazing gaming experience as with brand-new products!</p>

			<p className="welcome-description">All our games and consoles are expertly restored, thoroughly cleaned, and in<span className="key-word"> perfect condition. </span></p>

			<p className="welcome-description">Enjoy<span className="key-word"> free shipping </span>on every order, and everything you see on our website is in stock and ready to ship!</p>

			<div className="bestsellers">
				<h2>Best selling Nintendo Switch games!</h2>
				<BestGames />
			</div>

			<div className="ns2-container">
				<img src="/src/assets/sw2.png" alt="Nintendo Switch 2 Announcement" className="ns2-" />
			</div>

			
		</main>
	)
}
export default Home