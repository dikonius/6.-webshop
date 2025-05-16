import BestGames from "../components/BestSellingGames"
import "./Home.css"

const Home = () => {


	return (
		<main className="home-page">
			<img src="/6.-webshop/src/assets/logo.png" alt="Switch Again Logo" className="hero-logo" />
			<div className="hero-container">
				
				<p className="welcome-description">Welcome to Switch Again! Your<span className="key-word"> Online Second-Hand </span>Nintendo Switch Store!</p>

				<p className="welcome-description"><span className="key-word"> Save big </span>by buying pre-owned and enjoy the same amazing gaming experience as with brand-new products!</p>

				<p className="welcome-description">All our games and consoles are expertly restored, thoroughly cleaned, and in<span className="key-word"> perfect condition. </span></p>

				<p className="welcome-description">Enjoy<span className="key-word"> free shipping </span>on every order, and everything you see on our website is in stock and ready to ship!</p>
			</div>

			<div className="bestsellers">
				<h2 className="bestsellers-heading">Best selling Nintendo Switch games!</h2>
				<BestGames />
				
			</div>
			<h3 className="ns2-announcement-top">Get Ready!</h3>
			<h3 className="ns2-announcement"><span className="key-word">Follow us </span>on social media to be the first to know when Nintendo Switch 2 is <span className="key-word"> in stock!</span></h3>
			
			<img src="/6.-webshop/src/assets/sw2.png" alt="Nintendo Switch 2 Announcement" className="ns2-img" />
			

			
		</main>
	)
}
export default Home