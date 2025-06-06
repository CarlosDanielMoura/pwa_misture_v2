function UserProfileIcon(props: any) {
  return (
    <svg
      width={21}
      height={21}
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.777 6.01a4.723 4.723 0 119.446 0 4.723 4.723 0 01-9.446 0zM2.189 15.172c.874-1.066 2.407-1.806 4.017-1.806h6.588c1.61 0 3.142.74 4.017 1.806l.594-.487-.594.487c.44.536.723 1.167.748 1.837.025.676-.215 1.36-.764 1.987-1.435 1.642-3.78 2.717-7.295 2.717s-5.86-1.075-7.296-2.717c-.548-.627-.788-1.31-.763-1.986.025-.67.308-1.302.748-1.838z"
        stroke={props.stroke || "#379276"}
        strokeWidth={1.53535}
      />
    </svg>
  );
}

export default UserProfileIcon;
