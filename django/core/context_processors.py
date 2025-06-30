def sidebar_state(request):
    sidebar_open = request.COOKIES.get("sidebarOpen") == "true"
    return {
        "sidebar_open": sidebar_open
    }