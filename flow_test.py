import time
from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        print("Navigating to Quantum Shield...")
        page.goto("http://127.0.0.1:8083/index.html")
        page.wait_for_timeout(1000)
        
        # Take home page screenshot
        page.screenshot(path="C:\\Users\\Preetham.j\\.gemini\\antigravity\\brain\\c95f737b-481b-4921-aabf-dc774f62b939\\quantum_home_verified.png")
        print("Took home screenshot.")
        
        # Click the new Neural Core tab button
        print("Clicking Neural Core tab...")
        page.click("id=btn-tab-neural")
        page.wait_for_timeout(1000)
        
        # Click the sweep button
        print("Initiating sweep...")
        page.click("id=btnNeuralSweep")
        
        # Wait for the animation/timeouts to complete (3200ms + buffer)
        page.wait_for_timeout(4000)
        
        # Take the verified feature screenshot
        page.screenshot(path="C:\\Users\\Preetham.j\\.gemini\\antigravity\\brain\\c95f737b-481b-4921-aabf-dc774f62b939\\quantum_neural_verified.png")
        print("Took Neural Core verified screenshot.")
        
        browser.close()

if __name__ == "__main__":
    run_test()
