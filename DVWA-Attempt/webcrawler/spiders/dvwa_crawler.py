import scrapy as scrapy

from webcrawler.constants import *


class DVWASpider(scrapy.Spider):
    name = 'dvwa_spider'
    sqli_characters = ["'", "\"", "`"]

    def __init__(self, *args, **kwargs):
        super(DVWASpider, self).__init__(*args, **kwargs)
        self.login_user = DVWA_LOGIN_USERNAME
        self.login_pass = DVWA_LOGIN_PASSWORD

    def start_requests(self):
        yield scrapy.Request(DVWA_BASE_URL + DVWA_LOGIN_PAGE, callback=self.login)

    def login(self, response):
        self.logger.info("Attempting login to DVWA")
        try:
            yield scrapy.FormRequest.from_response(response,
                                                   formdata={'username': DVWA_LOGIN_USERNAME,
                                                             'password': DVWA_LOGIN_PASSWORD},
                                                   callback=self.post_login)

        except Exception:
            return self.logger.error("Login Failed")

    def post_login(self, response):

        if self.login_user in response.text:
            self.logger.info("Successfully logged into DVWA Web App")
            yield scrapy.Request(url=DVWA_BASE_URL + DVWA_VULNERABILITY_POINT,
                                 callback=self.vulnerability_scan,
                                 cookies={DVWA_SECURITY_KEY: DVWA_SECURITY_VALUE})

        else:
            return self.logger.error("Failed to log in.. Retry with correct credentials")

    def vulnerability_scan(self, response):
        count = 0

        for sql_char in self.sqli_characters:
            yield scrapy.FormRequest.from_response(
                response,
                formdata={'id': sql_char,
                          'Submit': 'Submit'},
                cookies={DVWA_SECURITY_KEY: DVWA_SECURITY_VALUE}
            )
            


