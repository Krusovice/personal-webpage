import styling from "./../../styles/userpage.module.css"

export default function UserLogin() {
	return (
		<div className={ styling.login }>
			<input 
			type="text"
			placeholder="email"
		/>
		</div>
		
		)
}