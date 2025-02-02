import urlparse

def urlvector(request):
    """ /path/to/path.html?p1=v1&p2=v2
        ->
        ['path', 'to', 'page.html', ('p1', 'p2'), ('v1', 'v2')]
    """
    # XXX "/path/to" and "path/to" will be trated the same!
    if request.path.strip() == ('/'):
        urltoks = ['/']
    else:
        urltoks = [i for i in request.path.split('/') if i]
    if not urltoks:
        urltoks = ['<SAME/PAGE>']
    query = request.query
    if query:
        keys, values = zip(*[(k, tuple(v)) for k, v in urlparse.parse_qs(query, True).iteritems()])
        urltoks.append(tuple(keys))
        urltoks.append(tuple(values))
    return tuple(urltoks)

def formvector(method, action, inputs, hiddens):
    urltoks = []
    if inputs:
        urltoks.append(tuple(inputs))
    urltoks.append(method)
    urltoks.extend([i if i  else '/' for i in action.path.split('/')])
    query = action.query
    if query:
        keys, values = zip(*[(k, tuple(v)) for k, v in urlparse.parse_qs(action.query, True).iteritems()])
        urltoks.append(tuple(keys))
        urltoks.append(tuple(values))
    if hiddens:
        # TODO hiddens values
        urltoks.append(tuple(hiddens))
    return tuple(urltoks)

def post_request_vector(method, action, inputs, values):
    urltoks = [method] + [i if i  else '/' for i in action.path.split('/')]
    query = action.query
    if query:
        keys, values = zip(*[(k, tuple(v)) for k, v in urlparse.parse_qs(action.query, True).iteritems()])
        urltoks.append(tuple(keys))
        urltoks.append(tuple(values))
    if inputs:
        urltoks.append(tuple(inputs))
    if values:
        # TODO hiddens values
        urltoks.append(tuple(values))
    return tuple(urltoks)


def linksvector(page):
    linksvector = tuple([tuple(i) for i in page.linkstree.iterlevels()])
    return linksvector


