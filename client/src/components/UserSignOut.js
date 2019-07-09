// stateless component
// will clear information and redirect to main courses page when user signs out

const UserSignOut = () => {
    localStorage.clear();
    window.location.href = '/';
    return null;
}

export default UserSignOut;
