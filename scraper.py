from playwright.sync_api import sync_playwright
import json
import time

def extract_upwork_articles(query=None):
    articles_data = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            if query:
                page.goto(f"https://dev.to/search?q={query}")
            else:
                page.goto("https://dev.to/search?q=upwork")

            time.sleep(5)

            page.wait_for_selector("div.substories")
            substories_div = page.query_selector("div.substories")
            articles = substories_div.query_selector_all("article.crayons-story")

            for article in articles:
                title_element = article.query_selector("h3.crayons-story__title a")
                title = title_element.inner_text()
                href = title_element.get_attribute("href")
                full_url = f"https://dev.to{href}"

                tags = []
                tags_elements = article.query_selector_all("div.crayons-story__tags a")
                for tag_element in tags_elements:
                    tags.append(tag_element.inner_text())

                articles_data.append({"Title": title, "Link": full_url, "Tags": tags})

        except Exception as e:
            print(f"Error during scraping: {str(e)}")

        finally:
            browser.close()

    return articles_data

if __name__ == "__main__":
    import sys

    query = sys.argv[1] if len(sys.argv) > 1 else None
    articles_data = extract_upwork_articles(query=query)

    print(json.dumps(articles_data))
