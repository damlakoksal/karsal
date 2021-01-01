import Link from "next/link";
import styles from "./menu-item.module.scss";

export default function MenuItem({ href, children, locale }) {
  // TODO: Ignore warning from here
  return (
    <li>
      <Link href={href} locale={locale}>
        <a className={styles.container}>{children}</a>
      </Link>
    </li>
  );
}
/* TODO: fix the bug about links */
