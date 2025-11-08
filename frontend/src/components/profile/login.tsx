import styling from "./../../styles/userpage.module.css"

export default function UserLogin() {
	return (
		<>
		<div className={ styling.login }>
			<input 
			type="text"
			placeholder="email"
		/>
		</div>

		<div className={ styling.password }>
			<input 
			type="password"
			placeholder="password"
		/>
		</div>
		</>
		)
}