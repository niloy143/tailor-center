const { useEffect } = require("react")

const useTitle = (title, homeTitle) => {
    useEffect(() => {
        document.title = homeTitle || `${title} - Tailor Center`;
    }, [title, homeTitle])
}

export default useTitle;