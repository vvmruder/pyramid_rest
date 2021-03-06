Pyramid REST interface
======================

This little package gives shortcuts to create a restful api to database sources. It provides a url pattern to serve the
sources.
It is meant to be used in a pyramid web framework eco system. It uses pyramid and sqlalchemy logic as well. Its goal is
to extend the database usage in pyramid frameworks. This way, it will be possible to serve data sources from
different databases.

Main features:

* read (json, geojson, xml) + filtering via json parameters
* read one / show (json, geojson, xml)
* create one
* update one
* delete one
* data model description (json, geojson, xml)

Special thing of this api: It can serve geometric extension objects too (It's only limit is geoalchemy2).

Dependencies:
=============
* pyramid (tested with 1.7.3)
* SQLAlchemy (tested with 1.0.15)
* GeoAlchemy2 (tested with 0.3.0)
* Shapely (tested with 1.5.17)
* dicttoxml (tested with 1.7.4)
* simplejson (tested with 3.8.2)


Usage in a standard pyramid web app
-----------------------------------

The pyramid framework for web apps provides an easy way for including standalone packages in its eco system. To learn
more about that, please refer to the http://docs.pylonsproject.org/projects/pyramid//en/latest/narr/extending.html.

In a nutshell (inside the __init__.py of your pyramids project in the main method ):

Configure the services which you want to be served via this api. Look at the following example to see how: 

```python
   from pyramid_rest.lib.rest import Api, Service
   from application.model import TestModel
   def main(global_config, **settings):
      """ This function returns a Pyramid WSGI application."""
      config = Configurator(settings=settings)
      config.include('pyramid_rest', route_prefix='api')
      test_api = Api(
         'postgresql://postgres:password@localhost:5432/test',
         config,
         'test_api'
      )
      test_service = Service(TestModel)
      test_api.add_service(test_service)
      config.scan()
      return config.make_wsgi_app()
```

Calling the config.include method with the packages name will do some initializing stuff (Note that the optional
parameter 'route_prefix' can be used to set the restful interface below a fix name space. This may be helpful especially
in big applications).
```
