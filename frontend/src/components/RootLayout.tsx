import styles from "../styles/Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <aside className={`${styles.sidebar} sidebar`}>
      <strong>Menu</strong>
      
      <nav className={styles.sidebarLinks}>
        <ul>
          <li><a href="#">New Modulus FEA 2D</a></li>
          <li><a href="#">New Modulus FEA 3D</a></li>
          <li><a href="#">Templates</a></li>
          <li><a href="#">Docs</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
